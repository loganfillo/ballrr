import React from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

const SearchBar: React.FC = () => {
    return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" />
                    <Icon name="ios-people" />
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
            </Header>
        </Container>
    );
};

export default SearchBar;
