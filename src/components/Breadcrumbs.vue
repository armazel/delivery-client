<template>
    <div class="rf-breadcrumbs">
        <div class="rf-breadcrumbs__item" v-for="breadcrumb in breadcrumbs">
            <router-link v-if="breadcrumb.name" :to="breadcrumb.name">
                {{ breadcrumb.caption }}
            </router-link>
            <span v-else>
                {{ breadcrumb.caption }}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'rf-breadcrumbs',

        props: {
            title: {
                type: String,
                default: 'Главная'
            },
            items: {
                type: Array,
                default: []
            }
        },

        computed: {
            breadcrumbs() {
                if (!this.items || !this.items.length) {
                    return [{caption: this.title}];
                } else {
                    return [{caption: this.title, name: 'main'}].concat(this.items);
                }
            }
        }
    };
</script>

<style lang="scss">
    .rf-breadcrumbs {
        display: flex;
        flex-direction: row;

        &__item {
            margin-right: 0.3rem;

            &::before {
                content: "\2192";
            }

            &:first-of-type::before {
                content: "";
            }
        }

        a {
            text-decoration: none;
            color: white;
            font-weight: normal;
        }

        span {
            font-weight: lighter;
        }
    }
</style>