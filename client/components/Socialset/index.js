import React from 'react';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';

class Socialset extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.openUrl = this.openUrl.bind(this);

    this.state = {
      isOpen: this.props.isOpen
    }


  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  openUrl(url){
    window.open(url);
  }

  render() {
    const {linkedin,facebook,twitter,instagram,github} = this.props
    return (
      <div>

            <Typography variant="caption">View Proofs of Identity</Typography>
            <IconButton className='fab fa-facebook-square' color="primary" onClick={()=>this.openUrl(facebook)} />
            <IconButton className='fab fa-twitter-square' color="primary" onClick={()=>this.openUrl(twitter)}/>

            <IconButton className='fab fa-linkedin' color="primary" onClick={()=>this.openUrl(linkedin)}/>

            <IconButton className='fab fa-github-square' color="primary" onClick={()=>this.openUrl(github)}/>

            <IconButton className='fab fa-instagram' color="primary" onClick={()=>this.openUrl(instagram)}/>


      </div>

    )
  }
}

Socialset.propTypes = {
  registered: PropTypes.string,
};


export default Socialset
