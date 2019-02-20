//@flow
import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native'
import Store from '../store/Store'
import type { StoreProps } from '../../store/Store'

type Props = {
    registered: string,     
    onPressVote: (event: any) => void,
    onPressRegister: (event: any) => void,
    onPressVouch:(event: any) => void,
};


const onPressVouch = (event)=> {
    alert('vouch')
}

const onPressVote = (event)=> {
    alert('vote')
}

const onPressRegister = (event) => {
   alert('register')
}


class Welcome extends React.Component<Props> {
    static defaultProps = {
        registered: "false"
      };

    constructor(){
        super()
        console.log("Welcome loaded")
    }
    

    render() {
        
        const registered = this.props.registered

        return (
            <View>

                <img src="/mewe-logo.png" className="logoImage" alt="" />
                <h1 variant="h6"  className="heroTitle">IDENTITY MADE FOR YOU</h1>
                <img src="/hero-image.png" className="heroImage"  alt="" />
                <br />
                <Button onPress={onPressVouch} title="Vouch and earn">Vouch and earn</Button>
                <br />
                {(registered === "true") &&
                    <Button onPress={onPressVote} title="Vote">Vote</Button>
                }

                    {(registered === "false") &&
                    <Button onPress={onPressRegister} title="Register">Register</Button>
                }

            </View>
        )
    }
}

export default Welcome;
