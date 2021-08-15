import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import { actions } from './actions';
import { connect } from 'react-redux';

import {
  AutoSizer,
  defaultTableHeaderRenderer,
  defaultTableRowRenderer,
  Column,
  Table
} from "react-virtualized";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
const mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
  };
}
const mapDispatchToProps = (dispatch) => ({
  setUsers: (users) => dispatch(actions.setUsers(users)),
})
// Connect react-virtualized and react-sortable-hoc
const SortableTable = SortableContainer(Table, {
  withRef: true
});
const SortableRow = SortableElement(defaultTableRowRenderer);
const DragHandle = SortableHandle(({ children }) => <div>{children}</div>);

const MIN_COLUMN_WIDTH = 50;
// console.log(list);
export default connect(mapStateToProps, mapDispatchToProps)(class DemoApp extends React.Component {

  constructor(props, context) {
    debugger
    super(props, context);
    this._draggableHeaderRenderer = this._draggableHeaderRenderer.bind(this);
    this._draggableColumn = this._draggableColumn.bind(this);
    this._rowRenderer = this._rowRenderer.bind(this);
    this._sortRow = this._sortRow.bind(this);

    this.state = {
      flexColums: ["id", "name", "extraordinaryHours","manualHours","hours","totalHours","options"],
      flexColumProps: {
        name: {
          cellRenderer: this._draggableColumn,
          dataKey: "name",
          label: "שם",
          width: 200
        },        
        extraordinaryHours: {
          cellRenderer: this._draggableColumn,
          dataKey: "extraordinaryHours",
          label: "שעות חריגות",
          width: 120
        },
        id: {
          cellRenderer: this._draggableColumn,
          dataKey: "id",
          label: "תעודת זהות",
          width: 150
        },
        manualHours: {
          cellRenderer: this._draggableColumn,
          dataKey: "manualHours",
          label: "שעות ידניות",
          width: 120
        },
        hours: {
          cellRenderer: this._draggableColumn,
          dataKey: "hours",
          label: "שעות",
          width: 120
        },
        totalHours: {
          cellRenderer: this._draggableColumn,
          dataKey: "totalHours",
          label: 'סה"כ שעות',
          width: 120
        },
        options: {
          cellRenderer: this._draggableColumn,
          dataKey: "options",
          label: "אפשרויות",
          width: 120
        },
      }
    };
  }
  _draggableHeaderRenderer(props) {
    return (
      <div className="DraggableHeader">
        {defaultTableHeaderRenderer(props)}
        <Draggable
          axis="x"
          defaultClassName="DragHandle"
          defaultClassNameDragging="DragHandleActive"
          onStop={(event, data) =>
            this._resizeColumn({
              dataKey: props.dataKey,
              deltaX: data.x
            })
          }
          position={{
            x: 0,
            y: 0
          }}
          zIndex={999}
        >
          <div>||</div>
        </Draggable>
      </div>
    );
  }

  _draggableColumn({ cellData, rowData, rowIndex }) {
    if (this._isRowSortable(rowIndex)) {
      return <DragHandle>{cellData}</DragHandle>;
    } else {
      return cellData + 1;
    }
  }

  _isRowSortable(index) {
    return index >= 0; // Header row should not be draggable
  }

  _resizeColumn({ dataKey, deltaX }) {
    const { flexColumProps } = this.state;
    // Once a column has been resized, lock its size
    // This prevents an awkward user experience where their resized width is overridden by flex
    const thisColumn = flexColumProps[dataKey];
    thisColumn.flexGrow = 0;
    thisColumn.flexShrink = 0;
    thisColumn.width = Math.max(MIN_COLUMN_WIDTH, thisColumn.width + deltaX);

    this.setState({
      flexColumProps
    });
  }

  _rowRenderer(props) {
    const { index } = props;
    return this._isRowSortable(index) ? (
      <SortableRow {...props} />
    ) : (
      defaultTableRowRenderer(props)
    );
  }

  _sortRow({ newIndex, oldIndex }) {
    if (newIndex === oldIndex) {
      return;
    }

    const row = this.props.users[oldIndex];
    const copyUsers = [...this.props.users];
    copyUsers.splice(oldIndex, 1);
    copyUsers.splice(newIndex, 0, row);
    this.props.setUsers(copyUsers)
    this.forceUpdate(); // Re-render
  }

  render() {
    debugger
    const { flexColums, flexColumProps } = this.state;
    return (
      <AutoSizer>
        {({ width, height }) => (
          <SortableTable
            getContainer={wrappedInstance =>
              ReactDOM.findDOMNode(wrappedInstance.Grid)
            }
            headerHeight={40}
            height={300} // height
            onSortEnd={this._sortRow}
            rowClassName="Row"
            rowHeight={50}
            rowGetter={({ index }) => this.props.users[index]}
            rowCount={this.props.users.length}
            rowRenderer={this._rowRenderer}
            useDragHandle
            width={width}
          >
            {flexColums.map(key => (
              <Column
                className="DragHandleColumn"
                key={key}
                headerRenderer={this._draggableHeaderRenderer}
                {...flexColumProps[key]}
              />
            ))}
          </SortableTable>
        )}
      </AutoSizer>
    );
  }
})
