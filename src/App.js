import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ProductList from './Product-List.js';
import TaxonomyFilter from './Taxonomy-Filter.js';

import getTaxonomyList from './getTaxonomyList.js';


// const API = 'http://generon.local/wp-json/wp/v2/product/';
const API = 'https://staging.generon.it/wp-json/wp/v2/product/';
const API_ITEMS = "id,title,link,tecnologie_names,product_tag_names,brand_names,image,acf";

const API_SORT = "&orderby=title&order=asc";

// const QUERY_PER_PAGE = '?per_page=100';
// const QUERY_ITEMS = '?items=id,title,link&settore_merceologico=191';
// const QUERY_ITEMS = '?_embed&settore_merceologico=28';
let products = [];

let selectedUpdatedListByTecnologie = []; //selectedUpdatedList by tecnologie
let selectedProducts_Tags = [];
let selectedTecnologia;

let firstTecnologieProducts = []
// https://gist.github.com/samikeijonen/7699b76c86fa2950d98ebee9e015b580

class App extends Component {

  constructor(props) {
    super(props);

    this.firstLoad = true;

    let settoreMerceologicoQueryString = ( (this.props.settoreMerceologico !== '') ? '&settore_merceologico=' + this.props.settoreMerceologico : '');
    let applicazioniQueryString = ( (this.props.applicazioni !== 'null') ? '&applicazioni=' + this.props.applicazioni : '' );

    this.state = {
      data: [],
      queryItems: '?items=' + API_ITEMS + settoreMerceologicoQueryString + applicazioniQueryString,
      queryTecnologie: '',
      isLoading: false,
      error: null,



    };




    this.updateText1 = this.updateText1

  }

  updateText1 = (selectedTaxonomy) => {
    this.firstLoad = false;
    console.log("selectedTaxonomy",selectedTaxonomy);
    console.log("selectedTaxonomy_taxonomy",selectedTaxonomy.taxonomy);

    if ( (selectedTaxonomy.checked) && (selectedTaxonomy.taxonomy == 'product_tag') ) {
     selectedProducts_Tags.push( selectedTaxonomy.value );
   } else {
     selectedProducts_Tags = selectedProducts_Tags.filter(item => {return item !== selectedTaxonomy.value} );
   }


   if (selectedTaxonomy.taxonomy == 'tecnologie') {
     selectedTecnologia = selectedTaxonomy.value;
     selectedProducts_Tags = [];
   }


    console.log("selectedTecnologia",selectedTecnologia);
    console.log("selectedProducts_Tags",selectedProducts_Tags);

      // https://codepen.io/pjmtokyo/pen/ZGVjVV
      var updatedList = products;

      // filter by tecnologie first if any
      if (selectedTecnologia) {
      updatedList = updatedList.filter(item => {

        // loop for multiple values in api
        for (var i = 0; i < item.tecnologie_names.length; i++) {
          if (item.tecnologie_names[i] == selectedTecnologia) { return true; }
        }

      });

      selectedUpdatedListByTecnologie = updatedList;
      }

      // then filter by product_tag if any
      if (selectedProducts_Tags.length > 0) {
      updatedList = updatedList.filter(item => {
        console.log("product_tag_names",item.product_tag_names);

        for (var i = 0; i < item.product_tag_names.length; i++) {

          for (var x = 0; x < selectedProducts_Tags.length; x++) {
            if (selectedProducts_Tags[x] == (item.product_tag_names[i]) ) { return true;}
          }


        }

      });
      }




    sessionStorage.setItem('selectedTecnologia', selectedTecnologia);
    sessionStorage.setItem('selectedProducts_Tags', selectedProducts_Tags);
    // sessionStorage.setItem('updatedList', updatedList);  


    // console.log("updatedList",updatedList);
    this.setState({data: updatedList});

  }


  componentDidMount() {
    this.loadData();

  }

  componentDidUpdate() {

  }




  loadData() {

    console.log(API + this.state.queryItems + this.state.queryTecnologie);

    this.setState({ isLoading: true });

    fetch(API + this.state.queryItems + this.state.queryTecnologie)
      .then(response => {
        if (response.ok) {
           //console.log(response.headers.get( 'x-wp-totalpages' ));

           const totalCount  = response.headers.get( 'x-wp-total' );
			     const pages       = response.headers.get( 'x-wp-totalpages' );

           // this.setState({ pages: pages })

           this.loadMore( totalCount, pages );

           // return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
  }





    loadMore( totalCount, pages ) {
      // console.log("loadmore" + totalCount + " " + pages);

		// Loop all pages, which was counted from the first REST API fetch.
		for ( let i = 1; i <= pages; i++ ) {
			fetch( API + this.state.queryItems + '&page=' + i )
				.then( response => response.json() )
				.then(  data => {


					// Add data to contacts array.
					products.push( ...data );
          // console.log("products",products);



          // getFirstTecnologia - create separate function for this! TO-DO
          const firstTecnologia = getTaxonomyList(products,'tecnologie').shift().value;
          console.log("firstTecnologia",firstTecnologia);
          // getFirstTecnologia

          // filter by first tecnologie
          firstTecnologieProducts = products.filter(item => {
            // loop for multiple values in api
            for (var i = 0; i < item.tecnologie_names.length; i++) {
              if (item.tecnologie_names[i] == firstTecnologia) { return true; }
            }
          });
          // filter by first tecnologie




          // return products;
          this.setState({ data: products, isLoading: false })




				});
		}

	}

















  render() {
    console.log("render app");


    let ProductListItems;
    if (this.firstLoad) {
      ProductListItems = firstTecnologieProducts;
    } else {
      ProductListItems = this.state.data;
    }




    return (
      <div className="App">



      <div className="row">
        <div className="col-md-4">
        <TaxonomyFilter data={getTaxonomyList(products,'tecnologie')} updateTextCB={this.updateText1} taxonomy="tecnologie" inputType="radio" />
        <TaxonomyFilter data={getTaxonomyList(selectedUpdatedListByTecnologie,'product_tag')} updateTextCB={this.updateText1} taxonomy="product_tag" inputType="checkbox" />
        </div>
        <div className="col-md-8"><ProductList data={ProductListItems} /></div>
      </div>



      </div>
    );
  }
}

export default App;
