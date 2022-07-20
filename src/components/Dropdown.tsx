import styled from '@emotion/styled';
import { observer, useLocalObservable } from 'mobx-react';

interface DropdownRootProps {
  height: number;
  fontColor: string;
}

const DropdownRoot = styled.div<DropdownRootProps>`
  box-sizing: border-box;
  text-align: left;
  width: 100%;
  height: ${ ({ height }) => height }px;
  position: relative;
  color: ${ ({ fontColor }) => fontColor };
`;

interface DropdownButtonProps {
  isOpen: boolean;
  borderColor: string;
  bgColor: string;
  height: number;
}

const DropdownButton = styled.button<DropdownButtonProps>`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  height: ${ ({ height }) => height }px;

  border: 1px solid ${ ({ borderColor }) => borderColor };
  border-bottom: ${ ({ isOpen }) => (isOpen ? 'none' : '') };
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: ${ ({ isOpen }) => (isOpen ? '0' : '4px') };
  border-bottom-right-radius: ${ ({ isOpen }) => (isOpen ? '0' : '4px') };

  background: ${ ({ bgColor }) => bgColor };

  cursor: pointer;
`;

interface DropdownListProps {
  isOpen: boolean;
  borderColor: string;
  maximumHeight: number;
  dropdownButtonHeight: number;
}

const DropdownList = styled.div<DropdownListProps>`
  box-sizing: border-box;
  display: ${ ({ isOpen }) => (isOpen ? '' : 'none') };
  width: 100%;
  max-height: ${ ({ maximumHeight }) => maximumHeight }px;

  border: 1px solid ${ ({ borderColor }) => borderColor };
  border-top: none;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  position: absolute;
  top: ${ ({ dropdownButtonHeight }) => dropdownButtonHeight }px;
  left: 0px;

  overflow-x: hidden;
  overflow-y: scroll;

  z-index: 999999999;
`;

interface DropdownListItemProps {
  topLineColor: string;
  dropdownButtonHeight: number;
  isSelected: boolean;
  bgColor: string;
  bgColorOnHover: string;
}

const DropdownListItem = styled.button<DropdownListItemProps>`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  height: ${ ({ dropdownButtonHeight }) => dropdownButtonHeight }px;

  border-top: 1px solid ${ ({ topLineColor }) => topLineColor };

  background: ${ ({ bgColor }) => bgColor };

  font-weight: ${ ({ isSelected }) => (isSelected ? 'bolder' : '500') };

  cursor: pointer;

  &:hover {
    background: ${ ({ bgColorOnHover }) => bgColorOnHover };
    font-weight: bolder;
  }
`;

interface DropdownState {
  isOpen: boolean;
  currentSelect: string;
  setIsOpen: (newIsOpen: boolean) => void;
  changeCurrentSelect: (newSelect: string) => void;
}

function Dropdown() {
  const { isOpen, currentSelect, setIsOpen, changeCurrentSelect } = useLocalObservable<DropdownState>(() => ({
    isOpen: false,
    currentSelect: '',
    setIsOpen(newIsOpen) { this.isOpen = newIsOpen },
    changeCurrentSelect(newSelect: string) { this.currentSelect = newSelect; },
  }));

  const closeList = () => {
    setIsOpen(false);
    document.removeEventListener('click', closeList);
  };

  const onCloseList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    changeCurrentSelect(e.currentTarget.value);
    closeList();
  };

  const openList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
    document.addEventListener('click', closeList);
  };

  return (
    <DropdownRoot
      height={50}
      fontColor='black'
    >
      <DropdownButton
        isOpen={isOpen}
        height={50}
        borderColor='#20CC20'
        bgColor='white'
        onClick={isOpen ? onCloseList : openList}
        value={currentSelect}
      >
        { currentSelect }
      </DropdownButton>
      <DropdownList
        isOpen={isOpen}
        borderColor='#20CC20'
        maximumHeight={200}
        dropdownButtonHeight={50}
      >
        <DropdownListItem
          topLineColor='#CCCCCC'
          dropdownButtonHeight={50}
          isSelected={true}
          bgColor='white'
          bgColorOnHover='#20CCCC'
          value='Item1'
          onClick={onCloseList}
        >
          Item1
        </DropdownListItem>
        <DropdownListItem
          topLineColor='#CCCCCC'
          dropdownButtonHeight={50}
          isSelected={true}
          bgColor='white'
          bgColorOnHover='#20CCCC'
          value='Item2'
          onClick={onCloseList}
        >
          Item2
        </DropdownListItem>
        <DropdownListItem
          topLineColor='#CCCCCC'
          dropdownButtonHeight={50}
          isSelected={true}
          bgColor='white'
          bgColorOnHover='#20CCCC'
          value='Item3'
          onClick={onCloseList}
        >
          Item3
        </DropdownListItem>
        <DropdownListItem
          topLineColor='#CCCCCC'
          dropdownButtonHeight={50}
          isSelected={true}
          bgColor='white'
          bgColorOnHover='#20CCCC'
          value='Item4'
          onClick={onCloseList}
        >
          Item4
        </DropdownListItem>
        <DropdownListItem
          topLineColor='#CCCCCC'
          dropdownButtonHeight={50}
          isSelected={true}
          bgColor='white'
          bgColorOnHover='#20CCCC'
          value='Item5'
          onClick={onCloseList}
        >
          Item5
        </DropdownListItem>
      </DropdownList>
    </DropdownRoot>
  );
}

export default observer(Dropdown);
