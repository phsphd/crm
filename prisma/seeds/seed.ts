// prisma/seeds/seed.ts
import { PrismaClient } from '@prisma/client'

// Initialize Prisma client
const prisma = new PrismaClient()

async function main() {
  console.log('-------- Seeding DB --------')

  try {
    // Check if users already exist
    const existingUsers = await prisma.user.findMany()
    
    if (existingUsers.length > 0) {
      console.log('Database already seeded, skipping...')
      return
    }

    // Create sample user
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'ADMIN',
      },
    })

    console.log('Created user:', user)

    // Create sample company
    const company = await prisma.company.create({
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
    })

    console.log('Created company:', company)

    // Create sample contact
    const contact = await prisma.contact.create({
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
    })

    console.log('Created contact:', contact)

    // Create sample lead
    const lead = await prisma.lead.create({
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
    })

    console.log('Created lead:', lead)

    // Create sample opportunity
    const opportunity = await prisma.opportunity.create({
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
    })

    console.log('Created opportunity:', opportunity)

    // Create sample task
    const task = await prisma.task.create({
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
    })

    console.log('Created task:', task)

    // Create sample project
    const project = await prisma.project.create({
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
    })

    console.log('Created project:', project)

    // Create sample invoice
    const invoice = await prisma.invoice.create({
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
    })

    console.log('Created invoice:', invoice)

    console.log('✅ Database seeded successfully!')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })