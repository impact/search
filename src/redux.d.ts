// Type definitions for Redux v1.0.0
// Project: https://github.com/rackt/redux
// Definitions by: William Buchwalter <https://github.com/wbuchwalter/>, Vincent Prouillet <https://github.com/Keats/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module Redux {

    interface ActionCreator extends Function {
        (...args: any[]): any;
    }

    interface Reducer<T> extends Function {
        (state: T, action: any): T;
    }

    interface Dispatch<A> extends Function {
        (action: A): A;
    }

    interface StoreMethods<T,A> {
        dispatch: Dispatch<A>;
        getState(): T;
    }


    interface MiddlewareArg<T,A> {
        dispatch: Dispatch<A>;
        getState: () => T;
    }

    interface Middleware<T,A> extends Function {
        (obj: MiddlewareArg<T,A>): Function;
    }

    class Store<T> {
        getReducer(): Reducer<T>;
        replaceReducer(nextReducer: Reducer<T>): void;
        dispatch<A>(action: A): A;
        getState(): T;
        subscribe(listener: Function): Function;
    }

	interface StoreCreator<T> extends Function {
		(reducer: Reducer<T>, initialState?: T): Store<T>;		
	}

    function createStore<T>(reducer: Reducer<T>, initialState?: T): Store<T>;
    function bindActionCreators<T,A>(actionCreators: T, dispatch: Dispatch<A>): T;
    function combineReducers<T>(reducers: { [key: string]: Reducer<T> }): Reducer<T>;
    function applyMiddleware<T,A>(...middlewares: Middleware<T,A>[]): StoreCreator<T>;
    function compose<T extends Function>(...functions: Function[]): T;
}

declare module "redux" {
    export = Redux;
}
