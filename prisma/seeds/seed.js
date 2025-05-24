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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// prisma/seeds/seed.ts
var client_1 = require("@prisma/client");
// Initialize Prisma client
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var existingUsers, user, company, contact, lead, opportunity, task, project, invoice, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('-------- Seeding DB --------');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, prisma.user.findMany()];
                case 2:
                    existingUsers = _a.sent();
                    if (existingUsers.length > 0) {
                        console.log('Database already seeded, skipping...');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                name: 'John Doe',
                                email: 'john@example.com',
                                role: 'ADMIN',
                            },
                        })];
                case 3:
                    user = _a.sent();
                    console.log('Created user:', user);
                    return [4 /*yield*/, prisma.company.create({
                            data: {
                                name: 'Acme Corporation',
                                description: 'A sample company for testing',
                                industry: 'Technology',
                                website: 'https://acme.com',
                                email: 'info@acme.com',
                                phone: '+1234567890',
                                address: '123 Business St',
                                city: 'San Francisco',
                                state: 'CA',
                                country: 'USA',
                                zipCode: '94105',
                                userId: user.id,
                            },
                        })];
                case 4:
                    company = _a.sent();
                    console.log('Created company:', company);
                    return [4 /*yield*/, prisma.contact.create({
                            data: {
                                firstName: 'Jane',
                                lastName: 'Smith',
                                email: 'jane@acme.com',
                                phone: '+1987654321',
                                position: 'CEO',
                                department: 'Executive',
                                userId: user.id,
                                companyId: company.id,
                            },
                        })];
                case 5:
                    contact = _a.sent();
                    console.log('Created contact:', contact);
                    return [4 /*yield*/, prisma.lead.create({
                            data: {
                                title: 'Enterprise Software Solution',
                                description: 'Potential client interested in our enterprise package',
                                status: 'QUALIFIED',
                                source: 'Website',
                                value: 50000,
                                priority: 'HIGH',
                                userId: user.id,
                                companyId: company.id,
                                contactId: contact.id,
                            },
                        })];
                case 6:
                    lead = _a.sent();
                    console.log('Created lead:', lead);
                    return [4 /*yield*/, prisma.opportunity.create({
                            data: {
                                title: 'Q1 Enterprise Deal',
                                description: 'Large enterprise client ready to purchase',
                                amount: 75000,
                                stage: 'PROPOSAL',
                                probability: 80,
                                closeDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                                userId: user.id,
                                companyId: company.id,
                                contactId: contact.id,
                            },
                        })];
                case 7:
                    opportunity = _a.sent();
                    console.log('Created opportunity:', opportunity);
                    return [4 /*yield*/, prisma.task.create({
                            data: {
                                title: 'Follow up with client',
                                description: 'Schedule demo for next week',
                                status: 'PENDING',
                                priority: 'HIGH',
                                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                                userId: user.id,
                                contactId: contact.id,
                                leadId: lead.id,
                            },
                        })];
                case 8:
                    task = _a.sent();
                    console.log('Created task:', task);
                    return [4 /*yield*/, prisma.project.create({
                            data: {
                                name: 'Website Redesign',
                                description: 'Complete overhaul of company website',
                                status: 'ACTIVE',
                                priority: 'MEDIUM',
                                startDate: new Date(),
                                endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
                                budget: 25000,
                                userId: user.id,
                                companyId: company.id,
                            },
                        })];
                case 9:
                    project = _a.sent();
                    console.log('Created project:', project);
                    return [4 /*yield*/, prisma.invoice.create({
                            data: {
                                number: 'INV-001',
                                title: 'Consulting Services',
                                description: 'Monthly consulting retainer',
                                amount: 5000,
                                tax: 500,
                                discount: 0,
                                total: 5500,
                                status: 'SENT',
                                issueDate: new Date(),
                                dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                                userId: user.id,
                                companyId: company.id,
                                invoiceItems: {
                                    create: [
                                        {
                                            description: 'Consulting Hours',
                                            quantity: 50,
                                            unitPrice: 100,
                                            amount: 5000,
                                        },
                                    ],
                                },
                            },
                        })];
                case 10:
                    invoice = _a.sent();
                    console.log('Created invoice:', invoice);
                    console.log('✅ Database seeded successfully!');
                    return [3 /*break*/, 12];
                case 11:
                    error_1 = _a.sent();
                    console.error('❌ Error seeding database:', error_1);
                    throw error_1;
                case 12: return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
