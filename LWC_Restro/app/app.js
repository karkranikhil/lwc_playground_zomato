import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track searchValue=''
    @track city=''
    @track restroDetails=[]
    get options() {
        return [
            { label: 'Delhi', value: '1' },
            { label: 'Mumbai', value: '3' },
            { label: 'Hyderabad', value: '6' },
            { label: 'Bengaluru', value: '4' },
            { label: 'Pune', value: '5' },
        ];
    }

    get restroDetailsLength(){
        return this.restroDetails.length>0
    }
    searchValueHandler(event){
        console.log(event.target.value)
        this.searchValue=event.target.value
    }

    searchBtnHandler(event){
        this.getData()
    }
    cityChangeHandler(event){
        console.log(event.detail.value)
        this.city = event.detail.value;
    }
    async getData(){
        let searchCity = `&q=${this.searchValue}`;
        let url= `https://developers.zomato.com/api/v2.1/search?entity_id=${this.city}&entity_type=city&q=${this.searchValue}&count=100`;
        console.log(url)
        let options = {
            method: 'get',
            headers: {
            "user-key": "bc7737f49e56c7fdddc0847b005a0f32",//"d710754ce67200fb6fb9b5e26139f50e",
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        let response = await fetch(url, options);
        let data = await response.json();
       console.log('Request succeeded with JSON response', JSON.stringify(data));
       this.restroDetails=[...data.restaurants]
       console.log(this.restroDetails)
       setTimeout(()=>{
        var elmnt = this.template.querySelector('c-restro-list');
            console.log(elmnt)
            elmnt.scrollIntoView({behavior: "smooth"});
       },1000)
       
    }
}
