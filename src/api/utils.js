import Promise from 'bluebird'
import { base64 } from '../utils/index'

/**
 * Вспомогательные методы для запросов к серверу
 */
export default {
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,

  prepareFetchOptions,
  prepareMapper,
  unwrapTextResponse,
  unwrapJsonResponse,

  serializeQueryFilter,
  serializeQuerySort,
  serializeQueryPagination
}

/**
 * GET запрос
 *
 * @param {String} url         Адрес
 * @param {Object} [options]    Параметры
 * @promise {*}
 */
function fetchGet (url, options) {
  return __fetch('get', url, null)
}

/**
 * POST запрос
 *
 * @param {String} url      Адрес
 * @param {Object} [body]   Тело запроса
 * @param {Object} [options] Параметры
 * @promise {*}
 */
function fetchPost (url, body, options) {
  return __fetch('post', url, options, body)
}

/**
 * PUT запрос
 *
 * @param {String} url      Адрес
 * @param {Object} [body]   Тело запроса
 * @param {Object} [options] Параметры
 * @promise {*}
 */
function fetchPut (url, body, options) {
  return __fetch('put', url, options, body)
}

/**
 * DELETE запрос
 *
 * @param {String} url      Адрес
 * @param {Object} [body]   Тело запроса
 * @param {Object} [options] Параметры
 * @promise {*}
 */
function fetchDelete (url, body, options) {
  return __fetch('delete', url, options, body)
}

function unwrapTextResponse (response) {
  // Если запрос завершился ошибкой, пытаемся разобрать ее текст
  if (!response.ok) {
    return __unwrapErrorResponse(response)
  }

  return response.text()
}

function unwrapJsonResponse (response) {
  // Если запрос завершился ошибкой, пытаемся разобрать ее текст
  if (!response.ok) {
    return __unwrapErrorResponse(response)
  }

  return response.json()
}

function prepareFetchOptions (authUser) {
  const options = {}

  if (authUser) {
    options.auth = {
      type: 'basic',
      login: authUser.password,
      password: authUser.password
    }
  }

  return options
}

/**
 * Создать функцию-преобразователь результата запроса к серверу в локальные объекты
 *
 * @param {Function} [Constructor] Функция-конструктор
 * @returns {Function}
 */
function prepareMapper (Constructor) {
  return function (data) {
    if (Array.isArray(data)) {
      return data.map((data) => Constructor ? new Constructor(data) : data)
    } else {
      return Constructor ? new Constructor(data) : data
    }
  }
}

function serializeQueryFilter (filter) {
  filter = filter || {}

  let queryFilter = ''
  Object.keys(filter).forEach(function (key) {
    if (filter[key] !== undefined) {
      if (typeof filter[key] === 'boolean' && filter[key]) {
        queryFilter = queryFilter + '&' + encodeURIComponent(key)
      } else if (filter[key] && filter[key].length) {
        queryFilter = queryFilter + '&' + encodeURIComponent(key) + '=' + encodeURIComponent(filter[key])
      }
    }
  })

  return queryFilter
}

function serializeQuerySort (sort) {
  sort = sort || {}

  let querySort = ''
  if (sort.sortBy) {
    querySort = '&sort=' + (sort.sortDirection === 'DESC' ? '-' : '') + sort.sortBy
  }
  return querySort
}

function serializeQueryPagination (pagination) {
  let queryPagination = ''
  if (pagination) {
    queryPagination += '&pageSize=' + (pagination.pageSize || 100)
    queryPagination += '&skip=' + (pagination.skip || 0)
  }

  return queryPagination
}

/**
 * Обертка вокруг HTML fetch, для установки обязательных заголовков
 *
 * @param {String}          method      HTTP метод
 * @param {String|Response} url         Адрес или запрос
 * @param {Object}          [inOptions] Параметры запроса
 * @param {Object}          [body]      Тело POST\PUT запроса
 * @promise {*}
 */
function __fetch (method, url, inOptions, body) {
  // Настройки запроса
  const options = inOptions || {}

  // Адрес
  url = __formatServerUrl(url, options.query)

  // Параметры запроса
  const fetchOptions = {
    method: method,
    headers: new window.Headers()
  }

  // Тело запроса
  if (body) {
    if (typeof body === 'object') {
      // Если есть функция, подготавливающая объект к запросу, то заменим его на результат ее вызова
      if (typeof body.prepareForRequest === 'function') {
        body = body.prepareForRequest()
      }
      body = JSON.stringify(body)
    }
    fetchOptions.body = body
  }

  // Заголовки
  fetchOptions.headers.set('Accept', 'application/json')
  fetchOptions.headers.set('Content-Type', 'application/json; charset=utf-8')
  // Аутентификация
  if (options.auth) {
    if (options.auth.type === 'token') {
      const token = options.auth.token || ''
      fetchOptions.headers.set('Authorization', 'Bearer ' + token)
    } else if (options.auth.type === 'basic') {
      const login = options.auth.login || ''
      const password = options.auth.password || ''
      fetchOptions.headers.set('Authorization', 'Basic ' + base64.encode(login + ':' + password))
    }
  }
  //TODO
  return Promise.try(() => window.fetch(url))
}

function __formatServerUrl (uriPart, params) {
  // Адрес
  if (uriPart && uriPart.length > 0) {
    if (uriPart[0] !== '/') {
      uriPart = uriPart
    }
  } else {
    uriPart = ''
  }

  // Параметры
  let paramsText = ''
  if (typeof params === 'object') {
    Object.keys(params).forEach(function (key) {
      paramsText += (paramsText.length > 0) ? '&' : ''

      paramsText += key + '=' + params[key]
    })
  }

  if (paramsText && paramsText.length) {
    uriPart += '?' + paramsText
  }
  // Объединяем с адресом сервера
  //return (window.API_URL || '') + uriPart
  return uriPart
}

class ServerError extends Error {
  constructor (data) {
    super(data.message || data.error || 'ServerError')
    this.error = data.error
    this.status = data.status
  }
}

function __unwrapErrorResponse (response) {
  // Если код ошибки - 400 или 500, то в теле должно быть описание ошибки в формате JSON ...
  if (response.status === 400 || response.status === 500 || __isJsonResponse(response)) {
    return response.json()
      .then((error) => {
        throw new ServerError(error)
      })
  } else {
    // ... иначе пытаемся прочитать ее как текст
    return response.text()
      .then(function (error) {
        if (error) {
          throw new Error(error)
        }

        // Если в теле ответа было пусто, то используем описание статуса ответа
        throw new Error(response.statusText)
      })
  }
}

function __isJsonResponse (response) {
  if (!response || !response.headers) {
    return false
  }

  const contentType = response.headers.get('content-type') || ''
  return contentType.indexOf('application/json') > -1
}
