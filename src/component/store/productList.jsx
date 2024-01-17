import { useEffect, useState } from "react"
import Product from "./product"

export default function ProductList(){

    const [categories , setCategories] = useState([])
    const [products , setProducts] = useState([])
    const [buttonValue , setButtonValue] = useState()
    const [curentCategoriy , setCurentCategoriy] = useState()

    // get categorie from api
    const getCategories = ()=>{
        fetch('https://fakestoreapi.com/products/categories')
        .then((reponse) => reponse.json() )
        .then((reponse) => setCategories(reponse))
    }

    const getAllProduct = ()=>{
        fetch('https://fakestoreapi.com/products')
        .then((reponse) => reponse.json() )
        .then((reponse) => setProducts(reponse))
    }

    // dispaly all categorie in button
    const displayCategory = ()=>{
        return categories.map((category,key)=>
        <button  key={key} onClick={()=>handleButton({category})} className='btn btn-dark' >{category}</button>
        )
    }

   const handleButton = (category)=> {
       // event.preventDefault()
         setCurentCategoriy(category)
         //setButtonValue(undefined)
         console.log(curentCategoriy)
   }

      // dispaly all categorie in button
      const displayProduct = ()=>{
        
        let newProductList = products;
       // console.log(curentCategoriy.category + "/" + buttonValue)
        if(curentCategoriy !== undefined && curentCategoriy !== '')
            newProductList =  products.filter((p)=>p.category === curentCategoriy.category)
       
        if(buttonValue !== undefined && buttonValue != ''){
            newProductList =  products.filter((p)=>p.title.toLowerCase().includes(buttonValue.toLowerCase())
            || p.id.toString().includes(buttonValue.toLowerCase() ))
        }

       
        return newProductList.map((prd,key)=>
             <Product product={prd} key={key}/>
        )
    }

    // fetch data from the first time
    useEffect(()=>{
        getCategories();
        getAllProduct();
    },[])

    const handleSubmit = (event)=>{
       
        event.preventDefault();
        const value= event.target.elements[0].value ;
        setButtonValue(value);
    }


    return (
        <div className=''>
            <form onSubmit={handleSubmit} className="container-fluix mx-auto w-75 my-3">
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label className="col-form-label"><h5>Search : </h5></label>
                    </div>
                    <div className="col-auto">
                        <input type="text" id="search" className="form-control"/>
                    </div>
                    <div className="col-auto">
                        <input className='btn btn-dark mx-2' type="submit" value='Search'/>
                        <input className='btn btn-secondary' onClick={()=>setButtonValue(undefined)} type="reset" value='Reset'/>
                    </div>
                </div>
                <hr/>
                
                <div className="row g-3 align-items-center">
                    <div className="btn-group">
                    <h5 className="m-1">Categories:  </h5> 
                    {/* : 'btn-secondary' */}
                    {displayCategory()}
                    </div>
                </div>
            </form>
            <hr/>           
           <h1>Products : </h1>
            <table className="table" border="2">
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Rating</th>
                </tr>
                </thead>
            <tbody>
              {displayProduct()}
            </tbody>
            </table>
        </div>
    )
}