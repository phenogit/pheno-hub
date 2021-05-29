import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMedia } from '@artsy/fresnel';
import {
    Button,
    Container,
    Menu,
    Segment,
    Visibility,
  } from 'semantic-ui-react';

import { HomepageHeading } from '../HomepageHeading';
import { HOME_MENU } from '../../settings/HOME_MENU';

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

const { Media } = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 1024,
    },
});
export class DesktopHeader extends Component {
    state = { activeItem: "home" };
  
    hideFixedMenu = () => this.setState({ fixed: false });
    showFixedMenu = () => this.setState({ fixed: true });
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  
    render() {
      const { children } = this.props;
      const { fixed, activeItem } = this.state;
  
      return (
        <Media greaterThan='mobile'>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 700, padding: '1em 0em' }}
              vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                  {
                    HOME_MENU.map((item) => {
                      if (item.type === 'text') {
                        return (
                          <Menu.Item
                            as='a'
                            name={item.name}
                            key={item.name}
                            active={activeItem === item.name}
                            onClick={this.handleItemClick}
                          >
                            {item.label}
                          </Menu.Item>);
                      }
                      
                    })
                  }
                  <Menu.Item as='a' active>
                    Home
                  </Menu.Item>
                  <Menu.Item as='a'>Work</Menu.Item>
                  <Menu.Item as='a'>Company</Menu.Item>
                  <Menu.Item as='a'>Careers</Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted={!fixed}>
                      Log in
                    </Button>
                    <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Container>
              </Menu>
              <HomepageHeading />
            </Segment>
          </Visibility>
  
          {children}
        </Media>
      )
    }
  }
  
  DesktopHeader.propTypes = {
    children: PropTypes.node,
  }