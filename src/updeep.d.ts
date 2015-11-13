// Type definitions for updeep 0.10.1
// Project: https://github.com/substantial/updeep
// Definitions by: Michael Tiller <http://github.com/xogeny/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module Updeep {
	interface IStatic {
		<T>(updates: {}, obj: T): T;
		updateIn<T>(path: string | Array<string | number>, value: any, obj: T): T;
		constant<T>(obj: T): T;
	}
}

declare var updeep: Updeep.IStatic;

declare module "updeep" {
	export = updeep;
}
