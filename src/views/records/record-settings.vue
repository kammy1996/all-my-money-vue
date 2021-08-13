<template>
  <div class="background-wrapper">
    <div class="space-30"></div>
   

      <div class="custom-container">
          <div class="ml-5">
            <v-breadcrumbs
              :items="breadcrumbs"
              divider="/"
            ></v-breadcrumbs>
          </div>
           <div class="space-20"></div>

        <div class="row">
          <div class="col-md-3">
             <v-card
              height="400"
              width="256"
              class="mx-auto"
            >
              <v-navigation-drawer permanent>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6">
                      Settings
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Manage Labels, Accounts, Categories from Here
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list
                  dense
                  nav
                >
                
                    <v-list-item
                      v-for="item in items"
                      :key="item.title"
                      link
                    >
                      <div class="d-flex setting-item" 
                        :class="currentView == item.key ? 'current-view' : ''"
                       @click="showSetting(item.key)"> 
                        <v-list-item-icon>
                          <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>

                       </div>
                    </v-list-item>
                 
        
                </v-list>
              </v-navigation-drawer>
            </v-card>
          </div>
          <div class="col-md-9">
              <div class="settings-view">
                <div v-if="currentView == 'general'">
                  <SettingsGeneral />
                </div>
                <div v-if="currentView == 'accounts'">
                  <SettingsAccounts />
                </div>
                <div v-if="currentView == 'categories'">
                  <SettingsCategories />
                </div>
                <div v-if="currentView == 'labels'">
                  <SettingsLabels />
                </div>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>

import SettingsAccounts from '../../components/records/record-settings/settings-accounts';
import SettingsCategories from '../../components/records/record-settings/settings-categories';
import SettingsGeneral from '../../components/records/record-settings/settings-general';
import SettingsLabels from '../../components/records/record-settings/settings-labels';

export default {
  name:'RecordSettings',
  data() {
    return { 
      items: [
        { title: 'General', icon: 'mdi-cog',key:'general' },
        { title: 'Accounts', icon: 'mdi-bank',key:'accounts' },
        { title: 'Categories', icon: 'mdi-shape',key:'categories' },
        { title: 'Labels', icon: 'mdi-label',key:'labels' },
      ],
      currentView:'general',  
      breadcrumbs: [
       {
          text: 'Records',
          disabled: false,
          href: '/records',
        },
        {
          text: 'Settings',
          disabled: false,
          href: 'settings',
        },
      ]
    }
  },
  components: {
    SettingsAccounts,
    SettingsCategories,
    SettingsGeneral,
    SettingsLabels,
  
  },
  methods: {
    showSetting(key) {
      this.currentView = key
    }
  }
}
</script>
<style scoped>
  .setting-item { 
    width:100%
  }
  .current-view { 
    background:rgba(3, 3, 250, 0.1);
    border-radius:2px;
    padding:0px 5px;
  }

</style>