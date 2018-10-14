import React, { Component } from 'react';
// import './ProductList.css';


class ProductList extends Component {

  render() {
    console.log("render ProductList");
    const  data  = this.props.data;

    return (

      <div className="product-list-container">
      {(data.length>0) &&
      <div className="product-list p-3 border border-primary rounded" style={{BorderRadius:10, height: 700, overflow:'auto'}}>

      <ul>
      {data.map( (data,i) =>
        <li key={i} className="list-unstyled">
          <div className="row no-gutters">

          <div className="col-md-2 text-center">
            <a href={data.link} >
            {data.image &&
              <img src={data.image}  width="70" alt="" />
            }

            </a>
          </div>

          <div className="col-md-10 mt-1">
            <a href={data.link} >
            <div>{i+1} - {data.title.rendered}</div>
            </a>
            <div>Brand: <strong>{data.brand_names.map((object) => { return object + ' '; })}</strong>  - Formato: <strong>{data.acf.formato}</strong></div>
            <div>
            Tecnologia: <strong>{data.tecnologie_names.map((object) => { return object + ' '; })}</strong>
            - tags: <strong>

              <span>{data.product_tag_names.map((object) => { return object + ' '; })}</span>

      </strong></div>
          </div>

          </div>
           <hr className="border-primary" />
        </li>
      )}
    </ul>

      </div>
    }

      </div>

    );



  }

}

export default ProductList;
