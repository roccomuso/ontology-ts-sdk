/*
 * Copyright (C) 2018 The ontology Authors
 * This file is part of The ontology library.
 *
 * The ontology is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The ontology is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The ontology.  If not, see <http://www.gnu.org/licenses/>.
 */

import Parameter from './parameter'

export default class AbiFunction {
    name : string
    returntype : string
    parameters : Array<Parameter> =[] 

    constructor(name : string, returntype : string, parameters: [any]) {
        this.name = name
        this.returntype = returntype
        let paramsTemp = parameters.map((item) => new Parameter(item.name, item.type, item.value))
        this.parameters = paramsTemp
    }

    getParameter(name : string) : any {
        let p  = <Parameter> {}
        for( let v of this.parameters) {
            if(v.getName() === name) {
                return v
            }
        }
        return null;
        
    }

    setParamsValue(...args : any[]) : void {
        for(let i=0, len=args.length; i<len;i++) {
            for(let j =0 ; j < this.parameters.length; j++) {
                if(args[i].name === this.parameters[j].getName()) {
                    this.parameters[j].setValue(args[i])
                }
            }
        }
    }

    toString() : string {
        let json = {
            name : this.name,
            returntype : this.returntype,
            parameters : this.parameters
        }

        return JSON.stringify(json)
    }
}