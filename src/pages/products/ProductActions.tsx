import React from 'react';
import AppBarAction from '../../components/appbar/AppBarAction';
import { SearchBox } from './styles';

interface ProductActionsProps {
  openSearchBox(): void;
  isSearching: boolean;
  handleSearch(value: string): void;
  loading: boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({ openSearchBox, isSearching, handleSearch, loading }) => {
  return (
    <>
      {isSearching ? (
        <SearchBox
          placeholder="Pesquisar..."
          returnKeyType="done"
          placeholderTextColor="#fff"
          autoFocus
          onChange={event => handleSearch(event.nativeEvent.text)}
        />
      ) : (
        <AppBarAction disabled={loading} iconName="search" packageIcon="mi" onPress={openSearchBox} />
      )}
    </>
  );
};

export default ProductActions;
