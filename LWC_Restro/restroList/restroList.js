import { LightningElement, api } from 'lwc';

export default class RestroList extends LightningElement {
    retroList
    @api
     get restroDetails() {
         return this.retroList;
     }
 
     set restroDetails(value) {
         console.log(JSON.stringify(value))
         this.retroList = value.map(restro=>{
                let item = restro.restaurant
                let rating_class = item.user_rating.rating_text ==="Excellent" ? 'rating excellent':
                item.user_rating.rating_text ==="Poor" ?  'rating poor':
                item.user_rating.rating_text ==="Average" ?  'rating average':
                item.user_rating.rating_text ==="Good" ?  'rating good':
                item.user_rating.rating_text ==="Very Good" ?  'rating very_good':
                
                item.user_rating.rating_text ==="Bad" ?  'rating bad':  'rating not-rated'
               
                

                return {"menu_url":item.menu_url,"rating_class":rating_class,"id":item.id, "location":item.location, "user_rating":item.user_rating, "thumb":item.thumb, "url":item.url, "name":item.name, "cuisines":item.cuisines, "currency":item.currency,  "average_cost_for_two":item.average_cost_for_two }
            });
     }
}
