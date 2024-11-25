export namespace request {
	
	export class StationHttpRequest {
	    name: string;
	    method: string;
	    url: string;
	    headers: {[key: string]: string};
	
	    static createFrom(source: any = {}) {
	        return new StationHttpRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.method = source["method"];
	        this.url = source["url"];
	        this.headers = source["headers"];
	    }
	}
	export class StationHttpResponse {
	    statusCode: number;
	    headers: {[key: string]: string[]};
	    body: string;
	
	    static createFrom(source: any = {}) {
	        return new StationHttpResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.statusCode = source["statusCode"];
	        this.headers = source["headers"];
	        this.body = source["body"];
	    }
	}

}

