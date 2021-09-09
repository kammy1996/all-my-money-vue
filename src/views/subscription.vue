<template>
  <div class="mt-10">
    <div class="custom-container">
      <div class="glance-view mb-10">
        Glance view
      </div>
      <div class="row" >
        <div class="col-md-9" >
          <div class="subscription-list">
            <div class="row">
              <div class="col-md-8">
                <h2><span style="color:green">Active</span> Subscriptions</h2>
              </div>
              <div class="col-md-4">
                <AddSubscriptionCategory />
                <AddSubscription  
                  class="ml-3"
                />
              </div>
            </div>
            <div class="row">
              <SubscriptionList />
            </div>
          </div>
        </div>
        <div class="col-md-3" >
          Financial Advices
        </div>
      </div>
     
    </div>
  </div>
</template>

<script>
import AddSubscription from '@/components/subscriptions/add-subscription.vue';
import AddSubscriptionCategory from '@/components/subscriptions/add-subscription-category.vue';
import SubscriptionList from '@/components/subscriptions/add-subscription-category.vue';

export default {
  name: 'Subscription',
  components: { 
    AddSubscription,
    AddSubscriptionCategory,
    SubscriptionList
  },
  mounted () {
    this.getAllSubscriptionDependencies();
  },
  methods : { 
    getAllSubscriptionDependencies() { 
      this.$store.dispatch(`subscription/GET_SUBSCRIPTION_CATEGORIES`);
    }
  }
};
</script>
