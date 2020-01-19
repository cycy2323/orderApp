import React, {Component} from 'react'
import { connect } from "dva";
import style from "./index.scss";
//  function index(props) {
//     return (
//         <div className={style.home}>
//             <div className={style.background}>
//                 <h1></h1>
//                 <h2>这里有大家喜爱的pizza和小吃!</h2>
//                 <div>{props.text}</div>
//             </div>
//         </div>
//     )
// }
// @connect()
class index extends Component{
    render() {
        this.props.dispatch({
            type: 'home/setSyncTitle1'
        })
        this.props.dispatch({
            type: 'home/setTitle2',
            data: {
                h2: '这里有大家喜爱的pizza和小吃!'
            }
        })
        return (
            <div className={style.home}>
            <div className={style.background}>
                <h1>{this.props.h1}</h1>
                <h2>{this.props.h2}</h2>
                <div>{this.props.text}</div>
             </div>
         </div>
        )
    }
}
const mapStateToProps = state => {
    // console.log(state)
    return {
        h1: state.home.h1,
        h2: state.home.h2,
        text: state.home.text
    }
}
// export default connect(({home}) =>({...home}))(index)
export default connect(mapStateToProps)(index)
