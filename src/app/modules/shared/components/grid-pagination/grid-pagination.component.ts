import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PagingInfo } from '../../../../state/state-models';

@Component({
  selector: 'app-grid-pagination',
  templateUrl: './grid-pagination.component.html',
  styleUrls: ['./grid-pagination.component.scss']
})
export class GridPaginationComponent implements OnInit {

  @Input() pagingInfo: PagingInfo
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  currentPageChange(pageNumber) {
    if(pageNumber)
    this.pageChange.emit(pageNumber)
  }

  onPageSizeChange(pageSize) {
    if(pageSize)
    this.pageSizeChange.emit(pageSize)
  }


}
