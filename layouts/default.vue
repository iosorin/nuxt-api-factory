<template lang="pug">
    v-app(dark)
        v-toolbar(fixed, app)
            v-toolbar-title.text-uppercase title
            v-spacer
            v-flex.text-xs-right(v-if="guest")
                div(v-if="guest")
                    v-btn(flat, nuxt, to="/login") Login
                    v-btn(flat, nuxt, to="/registration") Registration
            v-flex.text-xs-right(v-else)
                v-btn(flat, @click="logout") Logout
            v-toolbar-side-icon(@click='menu = !menu', :disabled="guest")


        v-content
            v-container.pt-0.relative-container(fill-height)
                v-layout.relative(row, justify-center, align-center)
                    nuxt
        v-navigation-drawer(temporary, v-model='menu', right, fixed, floating)
            v-list.text-uppercase
                v-list-tile(nuxt, exact, to='/')
                    v-list-tile-action
                        v-icon home
                    v-list-tile-title Home
                v-list-tile(nuxt, exact, to='/dashboard')
                    v-list-tile-action
                        v-icon dashboard
                    v-list-tile-title Dashboard

                Profiles-List

        Loading

</template>

<script>
import Loading from '~/components/loading'
import ProfilesList from '~/components/profile/list'

export default {
    components: {
        Loading,
        ProfilesList
    },

    data () {
        return {
            menu: false
        }
    },

    methods: {
        logout () {
            this.$store.dispatch('logoutUser').then(() => {
                this.$router.push('/login')
            })
        }
    },

    computed: {
        guest () {
            return this.$store.getters.guest
        }
    }
}
</script>

<style lang="stylus">
    .v-list__tile--active
        .v-list__tile__title,
        .v-list__tile__action
            color #fff !important
  @media only screen and (max-width : 1600px)
    .container.relative-container
        padding 0 !important
</style>
