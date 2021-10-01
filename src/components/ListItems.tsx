import { IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";

import { Component } from "react";
import { Link } from "react-router-dom";

class ListItem extends Component<any, any> {

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any){
        super(props);
        
    }
    
    render(){
        return(
            <div>
                
               <Link to={{pathname :"/portfolioDetails", state:{selectedTicker: this.props.items.selectedTicker} }}
               >{this.props.items.selectedTicker}</Link>
                <IonIcon onClick={()=>this.props.handleDelete(this.props.indexNum)} icon={trash}></IonIcon>
            </div>
        )
    }
}
export default ListItem;