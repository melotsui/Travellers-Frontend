export class PaginationResponse<T> {
    current_page: number;
    total_page: number;
    data: T[];
  
    constructor(data: { current_page: number, total_page: number, items: T[] }) {
      this.current_page = data.current_page;
      this.total_page = data.total_page;
      this.data = data.items;
    }
  }
  