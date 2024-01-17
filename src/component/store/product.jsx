export default function Product(props){

    return (<tr>
                <th scope="row">{props.product.id}</th>
                <td>{props.product.title}</td>
                <td>{props.product.price} $</td>
                <td>{props.product.description.slice(0,50)}...</td>
                <td>{props.product.category}</td>
                <td><img style={{width:"100px" , height : "100px"}} src={props.product.image} /> </td>
                <td>{props.product.rating.rate}/5</td>
                </tr>)
}