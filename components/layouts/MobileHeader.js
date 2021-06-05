import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createMedia } from '@artsy/fresnel';
import {
    Button,
    Container,
    Icon,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react';

import { RandomQuote } from '../RandomQuote';
import { HOME_MENU } from '../../settings/HOME_MENU';

const { Media } = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 1024,
    },
});

export class MobileHeader extends Component {
    state = { activeItem: 'home' };
  
    handleSidebarHide = () => this.setState({ sidebarOpened: false });
    handleToggle = () => this.setState({ sidebarOpened: true });
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  
    render() {
      const { children } = this.props;
      const { sidebarOpened, activeItem } = this.state;
  
      return (
        <Media as={Sidebar.Pushable} at='mobile'>
          <Sidebar.Pushable>
            <Sidebar
              as={Menu}
              animation='overlay'
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={sidebarOpened}
            >
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
            </Sidebar>
  
            <Sidebar.Pusher dimmed={sidebarOpened}>
              <Segment
                inverted
                textAlign='center'
                style={{ minHeight: 350, padding: '1em 0em' }}
                vertical
              >
                <Container>
                  <Menu inverted pointing secondary size='large'>
                    <Menu.Item onClick={this.handleToggle}>
                      <Icon name='sidebar' />
                    </Menu.Item>
                    <Menu.Item position='right'>
                      <Button as='a' inverted>
                        Log in
                      </Button>
                      <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                        Sign Up
                      </Button>
                    </Menu.Item>
                  </Menu>
                </Container>
                <RandomQuote mobile />
              </Segment>
  
              {children}
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Media>
      )
    }
  }
  
  MobileHeader.propTypes = {
    children: PropTypes.node,
  }