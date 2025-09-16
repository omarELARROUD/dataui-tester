interface QueryOptions {
  fields?: string[];
  search?: Record<string, any>;
  join?: { field: string }[];
  sort?: { field: string; order: 'ASC' | 'DESC' }[];
  page?: number;
  limit?: number;
  resetCache?: boolean;
}

export class RequestQueryBuilder {
  private options: QueryOptions = {};

  static create(options: QueryOptions = {}) {
    const builder = new RequestQueryBuilder();
    builder.options = options;
    return builder;
  }

  query(): string {
    const params = new URLSearchParams();

    if (this.options.fields && this.options.fields.length > 0) {
      params.append('fields', this.options.fields.join(','));
    }

    if (this.options.search) {
      Object.entries(this.options.search).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(`search[${key}]`, value.toString());
        }
      });
    }

    if (this.options.join && this.options.join.length > 0) {
      this.options.join.forEach((join, index) => {
        params.append(`join[${index}]`, join.field);
      });
    }

    if (this.options.sort && this.options.sort.length > 0) {
      this.options.sort.forEach((sort, index) => {
        params.append(`sort[${index}][field]`, sort.field);
        params.append(`sort[${index}][order]`, sort.order);
      });
    }

    if (this.options.page) {
      params.append('page', this.options.page.toString());
    }

    if (this.options.limit) {
      params.append('limit', this.options.limit.toString());
    }

    if (this.options.resetCache) {
      params.append('resetCache', 'true');
    }

    return params.toString();
  }

  getOptions(): QueryOptions {
    return this.options;
  }
}