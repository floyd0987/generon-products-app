import compressArray from './compressArray.js';


function getTaxonomyList(products,taxonomy) {
  let taxonomyList;
  let inputType;

  // let tecnologieNames = products.map(item => item.pure_taxonomies.tecnologie);
  // tecnologieNames = [].concat.apply([], tecnologieNames);
  // console.log("tecnologieNames",tecnologieNames);

  switch (taxonomy) {
    case "product_tag": taxonomyList = products.map(item => item.product_tag_names); break;
    case "tecnologie": taxonomyList = products.map(item => item.tecnologie_names); break;

    default:
  }

  taxonomyList = taxonomyList.filter( element => {  return element.length > 0; }); //remove undefined
  taxonomyList = [].concat.apply([], taxonomyList); //merge array of arrays
  //taxonomyList = taxonomyList.map(item => taxonomy + '-' + item); //convert to string
  taxonomyList = compressArray(taxonomyList); // remove duplicates and get count
  // taxonomyList = this.removeDuplicates(taxonomyList,'term_id');
  taxonomyList.sort(function(a,b) {return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0);} ); //sort alphabetically


  // console.log("taxonomyList " + taxonomy,taxonomyList);

  return taxonomyList;

}

export default getTaxonomyList;
