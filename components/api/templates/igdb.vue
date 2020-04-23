<template lang="pug">
  v-layout
      v-container.pa-0(grid-list-lg, fluid)
        v-layout(row, wrap)
          v-flex(v-for="card in cards", :key="card.id", xs12 sm6 md3)
            v-hover
              v-card(
              hover
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"
              :color="hover ? 'white' : 'grey lighten-3'"
              @click="openModal(card)"
              )
                v-img(
                :src="replaceThumb(card.cover.url)",
                :lazy-src="replaceThumb(card.cover.url)",
                aspect-ratio='1.1'
                )
                v-card-title.black--text
                  div
                    h3.body-2.mb-0.text-capitalize {{card.name}}
                    div  {{card.genres[0].name}}

      v-dialog(v-model='modal.state', max-width='25vw')
        v-card(color="black")
          v-carousel(
          :cycle="false",
          hide-delimiters,
          height="15vw",
          next-icon="arrow_right"
          prev-icon="arrow_left"
          )
              v-carousel-item(v-for='(item,i) in modal.screenshots', :key='i')
                v-img( :src="replaceThumb(item.url)" )

          a.white--text.text-xs-center(:href="modal.link" target="_blank")
            v-card-text
              p {{modal.description}}
            v-card-actions.pb-4.pt-0.justify-center
                h6.title {{modal.title}}

</template>


<script>
export default {
    props: ['data'],

    data () {
        return {
            modal: {
                state: false,
                title: '',
                description: '',
                link: '',
                screenshots: [],
                videos: []
            }
        }
    },

    methods: {
        openModal (card) {
            this.modal.title = card.name
            this.modal.description = card.summary
            this.modal.link = card.url
            this.modal.screenshots = card.screenshots.slice(0, 3)
            this.modal.state = true
        },

        replaceThumb (url) {
            return url.replace('t_thumb', 't_screenshot_med')
        }
    },

    computed: {
        cards () {
            return this.data.slice(0, 8)
        }
    }
}
</script>

<style lang="stylus" scoped>
  .v-card
    height 100%
    display flex
    flex-direction column
    justify-content flex-end
</style>
