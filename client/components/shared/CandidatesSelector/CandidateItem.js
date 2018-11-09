
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Socialset from '../../Socialset'



class CandidateItem extends Component {

  static propTypes = {
    key:PropTypes.number,
    id: PropTypes.string,
    photo: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    ethOffering:PropTypes.number,
    socialMedia: PropTypes.object,
    isOpen:PropTypes.bool,
    vouched:PropTypes.object,
    suspcious:PropTypes.object,
    isVoter:PropTypes.boolean
  }

 

  render() {

    const { key, firstname, lastname, photo, ethOffering,vouched,suspicious,socialMedia } = this.props
    const { facebook, twitter, linkedin, instagram, github } = socialMedia
    const isVoter = this.props.isVoter

    return (
      <div className="candidate" key={key}>

        <img src={photo} alt="" />
        <div className="candidateMeta">
          <Typography variant="caption" gutterBottom>Offering: {ethOffering} ETH</Typography>
          <Typography variant="h5" gutterBottom>{firstname + " " + lastname}</Typography>

          {isVoter&&<div>{vouched.amount}  Vouched  {vouched.money}</div>}
          {isVoter&&<div>{suspicious.amount}  Suspicious  {suspicious.money}</div>}

          <Socialset isOpen={this.props.isOpen} linkedin={linkedin} facebook={facebook} twitter={twitter} instagram={instagram} github={github} />
        </div>

      </div>

    )
  }
}

export default CandidateItem
