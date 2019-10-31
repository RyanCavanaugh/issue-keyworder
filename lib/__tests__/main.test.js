"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const wait_1 = require("../src/wait");
const process = __importStar(require("process"));
const cp = __importStar(require("child_process"));
const path = __importStar(require("path"));
test('throws invalid number', () => __awaiter(void 0, void 0, void 0, function* () {
    const input = parseInt('foo', 10);
    yield expect(wait_1.wait(input)).rejects.toThrow('milleseconds not a number');
}));
test('wait 500 ms', () => __awaiter(void 0, void 0, void 0, function* () {
    const start = new Date();
    yield wait_1.wait(500);
    const end = new Date();
    var delta = Math.abs(end.getTime() - start.getTime());
    expect(delta).toBeGreaterThan(450);
}));
// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    process.env['INPUT_MILLISECONDS'] = '500';
    const ip = path.join(__dirname, '..', 'lib', 'main.js');
    const options = {
        env: process.env
    };
    console.log(cp.execSync(`node ${ip}`, options).toString());
});
