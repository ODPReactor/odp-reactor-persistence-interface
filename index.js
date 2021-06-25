Object.defineProperty(exports, "__esModule", { value: true });
exports.SparqlDataMapper = exports.SparqlClient = exports.SparqlGraphTestHelper = void 0;
const SparqlGraphTestHelper_1 = require("./repository/clients/sparql/test/SparqlGraphTestHelper");
Object.defineProperty(exports, "SparqlGraphTestHelper", { enumerable: true, get: function () { return SparqlGraphTestHelper_1.SparqlGraphTestHelper; } });
const SparqlClient_1 = require("./repository/clients/sparql/SparqlClient");
Object.defineProperty(exports, "SparqlClient", { enumerable: true, get: function () { return SparqlClient_1.SparqlClient; } });
const SparqlDataMapper_1 = require("./repository/datamappers/SparqlDataMapper");
Object.defineProperty(exports, "SparqlDataMapper", { enumerable: true, get: function () { return SparqlDataMapper_1.SparqlDataMapper; } });
