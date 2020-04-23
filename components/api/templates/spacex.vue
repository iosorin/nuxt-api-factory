<template lang="pug">
    v-container.pa-0(fluid, grid-list-md)
        v-data-iterator(:items='data', content-class="layout row wrap", hide-actions)
            template(v-slot:header)
                v-toolbar.mb-2(color='black', dark)
                    v-toolbar-title.text-uppercase Rocket table
            template(v-slot:item='props')
                v-flex(xs12, sm6, md4, lg3)
                    v-card(color='white', light)
                        v-card-title
                            h4 {{ props.item.rocket_name }}
                        v-divider
                        v-card-text.pa-0
                            v-list(dense).text-capitalize
                                v-list-tile
                                    v-list-tile-content first flight:
                                    v-list-tile-content.al-end {{ props.item.first_flight }}
                                v-list-tile
                                    v-list-tile-content success rate:
                                    v-list-tile-content.al-end {{ props.item.success_rate_pct }}
                                v-list-tile
                                    v-list-tile-content status:
                                    v-list-tile-content.al-end.text-lowercase {{ props.item.active ? 'active' : 'not active'}}
                                v-list-tile
                                    v-list-tile-content height(m):
                                    v-list-tile-content.al-end {{ props.item.height.meters }}
                                v-list-tile
                                    v-list-tile-content mass:
                                    v-list-tile-content.al-end {{ props.item.mass.kg }}
                                v-list-tile
                                    v-list-tile-content diameter:
                                    v-list-tile-content.al-end {{ props.item.diameter.meters }}
                                v-list-tile
                                    v-list-tile-content engines:
                                    v-list-tile-content.al-end {{ props.item.engines.number }}
                                v-list-tile
                                    v-list-tile-content stages:
                                    v-list-tile-content.al-end {{ props.item.stages }}
                                v-list-tile
                                    v-list-tile-content landing legs:
                                    v-list-tile-content.al-end {{ props.item.landing_legs.number }}
                        v-card-actions.d-flex.pa-0
                            v-list.text-uppercase.pa-0(dense)
                                v-hover
                                    v-list-tile(
                                    slot-scope="{ hover }"
                                    :href="props.item.wikipedia",
                                    target="_blank"
                                    :class="hover ? 'black white--text' : 'white black--text'"
                                    )
                                        v-list-tile-content.font-weight-black.px-1 WIikipedia

</template>


<script>
export default {
    props: ['data']
}
</script>
