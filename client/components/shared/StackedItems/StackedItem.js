import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import StackedItems from '.';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

const styles = theme => ({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function StackedItem(props) {
  const { classes, theme, item } = props;

  return (
    <Card className={classes.card}>
      <Avatar
        alt={item.firstname + " " + item.lastname}
        src={item.photo}
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
     
      <div className={classes.details}>
        <CardContent className={classes.content}>
        <div>
        {item.vouched?"Vouched":"Fake"}
      </div>
          <Typography component="h3" variant="h5">
            {item.firstname + " " + item.lastname}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            <div>Time Left:{item.timeLeft}</div>
            <div>ETH:{item.ETH}</div>

          </Typography>
        </CardContent>

      </div>


    </Card>
  );
}

StackedItem.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(StackedItem);