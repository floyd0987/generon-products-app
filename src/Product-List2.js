import React, { Component } from 'react';
// import './ProductList2.css';

import api from './Api.js';

class ProductList2 extends Component {

  constructor(props,api) {
    super(props);

    this.state = {
      data: [],
      animating: true
    };
  }

  componentDidMount(api) {


    let totalPages, totalNumberOfPosts
    api.fetchPosts()
        .then((res) => {
            totalPages = res.headers.map['x-wp-totalpages'][0]
            totalNumberOfPosts = res.headers.map['x-wp-total'][0]
            return res.json()
        })
        .then((json) => {
            this.setState({
                data: json,
                animating: !this.state.animating,
                totalPages,
                totalNumberOfPosts
            })
        })
        .catch((error) => {
            console.error(error)
        })


  }












  render() {

    const { data } = this.state;
    // console.log(data);

    return (
      <div className="product-list">

      <ul>
      {data.map(data =>
        <li key={data.id}>
          {data.title.rendered}
        </li>
      )}
    </ul>

      </div>
    );



  }

}

export default ProductList2;
