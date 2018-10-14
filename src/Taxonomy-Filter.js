import React, { Component } from 'react';



class TaxonomyFilter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //data: ["test","gasgasg","hsholk"],

      isLoading: false,
      error: null,
      selectedTaxonomies:[]

    };



  }

  componentDidMount() {
    this.setState({ isLoading: true });


    console.log("componentDidMount TaxonomyFilter");
  }


  removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
  }







  handleChange = (event) => {
    // this.setState({message: event.target.value});
    console.log(event.target.name);
    console.log(event.target.value);

    // if (event.target.name == 'tecnologie') {
      this.state.selectedTaxonomies = []; // empry array for single option
    // }

    this.state.selectedTaxonomies = {
      taxonomy: event.target.name,
      value:event.target.value,
      checked:event.target.checked
    };


    this.props.updateTextCB(this.state.selectedTaxonomies);
    }



  render() {
      console.log("render TaxonomyFilter");
    const taxonomy = this.props.taxonomy;

    const taxonomyList = this.props.data;

    return (

      <div className="taxonomy-filter-container">

      {(taxonomyList.length>0) &&
      <div className="taxonomy-filter mb-4 p-3 border border-primary rounded" style={{BorderRadius:10}}>
  		<h6 className="text-uppercase mb-2"> {taxonomy} </h6>

      {taxonomyList.map( (taxonomyList,i) =>
        <li key={i} className="list-unstyled text-left">

          <div className="form-check">
    			  <input className="form-check-input" defaultChecked={((taxonomy=='tecnologie')&&(i==0)) && true} type={this.props.inputType} name={taxonomy} onChange={this.handleChange} value={taxonomyList.value}  id={taxonomy + '_' + i} />
    			  <label className="form-check-label text-uppercase font-weight-bold small" htmlFor={taxonomy + '_' + i}>{taxonomyList.value} ({taxonomyList.count})</label>
    			</div>

        </li>
      )}


      </div>
    }

      </div>




    );



  }

}

export default TaxonomyFilter;
