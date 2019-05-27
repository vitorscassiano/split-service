const { Client, Pool } = require("pg")
const faker = require("faker")

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "schemaless",
  password: "password",
  database: "schemaless",
})

const runQuery = async (query, params) => {
  try {
    const start = Date.now()
    const res = await pool.query(query, params)
    const duration = Date.now() - start
    console.info({ status: "Ok", query, params, duration, rows: res.rowCount })

    return res
  } catch ({ message, stack }) {
    console.error({ query, params, status: "error", message, stack })
    throw new Error('Problems with executed query')
  }
}

const insert = async (table, value) => {
  let params
  if (typeof value === 'object') {
    params = JSON.stringify(value)
  } else if(typeof value === 'string') {
    params = value
  } else {
    throw new Error("Foobar")
  }

  return runQuery(`INSERT INTO ${table} (body) VALUES ($1)`, [params])
}

const find = async (table, object) => {
  return runQuery(`SELECT * FROM ${table} WHERE body @> $1`, [object])
}

const updateOne = async (object) => {
  const experiments = runQuery(`SELECT * FROM ${table} WHERE body @> $1`, [object])
  runQuery(`UPDATE TABLE ${table} SET body = $2 WHERE id = $1`, [id, params])
}

const json = {
  name: "experiment",
  description: "",
  hypothesys: "",
  team: "",
  variants: [],
  metrics: [],
  versions: []
}

const main = async () => {
  for (let i = 0; i < 1000; i++) {
    await insert("experiment", {
      name: faker.name.findName(),
      age: parseInt(Math.random() * 100),
      address: faker.address.streetAddress(),
      phone: `(21) ${faker.phone.phoneNumber()}`
    })
  }
  const result = await find("experiment", { name: "Vitor", age: 30 })
  return result.rows
}

main().then(console.log)

module.exports = {
  insert,
  find,
  updateOne
}
