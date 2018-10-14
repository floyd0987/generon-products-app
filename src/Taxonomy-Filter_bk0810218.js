import React, { Component } from 'react';



class TaxonomyFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: ["test","gasgasg","hsholk"],

      isLoading: false,
      error: null,
      selectedTaxonomies:[]

    };


  }

  componentDidMount() {
    this.setState({ isLoading: true });

  }


  removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
  }

   compressArray = (original) => {
      // https://gist.github.com/ralphcrisostomo/3141412

    var compressed = [];
    // make a copy of the input array
    var copy = original.slice(0);

    // first loop goes over every element
    for (var i = 0; i < original.length; i++) {

      var myCount = 0;
      // loop over every element in the copy and see if it's the same
      for (var w = 0; w < copy.length; w++) {
        if (original[i] == copy[w]) {
          // increase amount of times duplicate is found
          myCount++;
          // sets item to undefined
          delete copy[w];
        }
      }

      if (myCount > 0) {
        var a = new Object();
        //a.value = original[i];
        // a.count = myCount;
        a = original[i];
        a.count = myCount;
        compressed.push(a);
      }
    }

    return compressed;
};


  handleChange = (event) => {
    // this.setState({message: event.target.value});
    console.log(event.target.name);
    console.log(event.target.value);

    if (event.target.name == 'tecnologie') {
      this.state.selectedTaxonomies = []; // empry array for single option
    }

    this.state.selectedTaxonomies.push({
      taxonomy: event.target.name,
      term_id:event.target.value
    });


    this.props.updateTextCB(this.state.selectedTaxonomies);
    }





  render() {
    const taxonomy = this.props.taxonomy;

    const products = this.props.data; //get products from parent props
    let taxonomyList;
    let inputType;

    switch (taxonomy) {
      case "product_tag": taxonomyList = products.map(item => item.pure_taxonomies.product_tag); inputType="checkbox"; break;
      case "tecnologie": taxonomyList = products.map(item => item.pure_taxonomies.tecnologie); inputType="radio"; break;
      default:
    }

    taxonomyList = taxonomyList.filter( element => {  return element !== undefined; }); //remove undefined

    taxonomyList = this.compressArray(taxonomyList); // remove duplicates and get count
    taxonomyList = [].concat.apply([], taxonomyList); //merge array of arrays
    taxonomyList = this.removeDuplicates(taxonomyList,'term_id');

    console.log("taxonomyList",taxonomyList);


    return (

      <div className="filter-container mb-4 p-3 border border-primary rounded" style={{BorderRadius:10}}>
  		<h6 className="text-uppercase mb-2"> {this.props.taxonomy} </h6>

      {taxonomyList.map( (taxonomyList,i) =>
        <li key={i} className="list-unstyled text-left">

          <div className="form-check">
    			  <input className="form-check-input" type={inputType} name={taxonomy} onChange={this.handleChange} value={taxonomyList.term_id} id={taxonomy + '-' + i} />
    			  <label className="form-check-label text-uppercase font-weight-bold small" htmlFor={taxonomy + '-' + i}>{taxonomyList.term_id} - {taxonomyList.name} ({taxonomyList.count})</label>
    			</div>

        </li>
      )}


      </div>




    );



  }

}

export default TaxonomyFilter;
