import axios from 'axios'

import { LOAD_EXTENDED_UNITS, LOAD_UNIT_REPORTS, ERROR } from '../actionTypes'
import { API_URL, ACTIVITY_TYPE } from '../constants'

export const loadUnits = (token, companyId) =>
    async dispatch => {
        await axios.get(`${API_URL}/companies/${companyId}/units`, { headers: { 'Authorization': `token ${token}` } })
            .then(response => {
                units = mapUnits(response.data)
                promises = units.map(unit => axios.get(`${API_URL}/units/${unit.id}`, { headers: { 'Authorization': `token ${token}` } }))
                Promise.all(promises)
                    .then(extendedUnits => dispatch(dispatchLoadUnits(units = extendedUnits.map((extendedUnit, ind) => mapUnit(units[ind], extendedUnit.data)))))
            })
            .catch(error => { console.log(error); dispatch(dispatchError(error)) })
    }

export const loadUnitReports = (token, unitId) =>
    async dispatch => {
        reportsData = await axios.get(`${API_URL}/units/${unitId}/maintenance-reports`, { headers: { 'Authorization': `token ${token}` } })
        reports = mapUnitReports(reportsData.data)
        dispatch(dispatchLoadUnitReports(unitId, reports))
    }

const mapUnits = units =>
    units.filter(unit => unit.location && unit.template.manufacturer).map(unit => ({
        id: unit.id,
        name: unit.name,
        site: unit.location.name,
        siteId: unit.location.id,
        general: {
            type: unit.unit_model,
            model: unit.template.name,
            manufacturer: unit.template.manufacturer.name
        }
    }))

const mapUnitReports = unitReports =>
    unitReports.map(report => ({
        id: report.id,
        date: report.report_date,
        type: ACTIVITY_TYPE[report.type], // find type
        responsible: `${report.reporter.first_name} ${report.reporter.last_name}`
    }))

const mapUnit = (unit, extendedUnit) => {
    components = extendedUnit.components.map(component => ({
        id: component.id,
        name: component.name,
        type: component.type,
        status: component.status,
        model: component.template.template_type.unit_model
    }))

    documents = extendedUnit.documents.map(document => ({
        id: document.id,
        name: document.name,
        type: document.type,
        language: document.language,
        description: document.description
    }))

    mappedUnit = {
        ...unit,
        components: components,
        documents: documents,
        //reports: unitReports,
        planningReports: [],
        general: {
            ...(unit.general),
            manufacturingYear: extendedUnit.template.manufacturing_start_year,
            manufacturingNumber: extendedUnit.manufacturing_number,
            commisioningYear: extendedUnit.commissioning_year,
            systemVoltage: extendedUnit.template.system_voltage,
        }
    }

    if (mappedUnit.general.type === 'Transformer')
        mappedUnit = {
            ...mappedUnit,
            description: {
                localisation: extendedUnit.location.name,
                areaOfUse: extendedUnit.area_of_use,
                oilMass: extendedUnit.oil_mass,
                cooling: extendedUnit.cooling_type
            },
            gridInformation: {
                numberOfVoltageSystems: extendedUnit.voltage_systems,
                numberOfPhases: extendedUnit.phases,
                ratedPowerHV: Math.round(extendedUnit.rated_power_hv),
                ratedPowerLV: Math.round(extendedUnit.rated_power_lv),
                connectionTypeHV: extendedUnit.connection_type_hv,
                connectionTypeLV: extendedUnit.connection_type_lv,
                systemVoltageHV: Math.round(extendedUnit.system_voltage_hv),
                systemVoltageLV: Math.round(extendedUnit.system_voltage_lv)
            },
            other: {
                mainTankGrounded: extendedUnit.main_tank_grounded,
                vacuumProof: extendedUnit.vacuum_proof
            },
            scheme: {
                transformerFeeding: extendedUnit.transformer_feeding,
                transformerExpectedLife: extendedUnit.expected_life,
                redundancy: extendedUnit.redundancy
            }
        }
    else if (mappedUnit.general.type === 'Breaker')
        mappedUnit = {
            ...mappedUnit,
            description: {
                localisation: extendedUnit.location.name,
                areaOfUse: extendedUnit.area_of_use,
                ratedVoltage: Math.round(extendedUnit.rated_voltage),
                ratedCurrent: Math.round(extendedUnit.rated_current),
                breakerMedium: extendedUnit.breaker_medium,
                breakerTechnology: extendedUnit.breaker_technology,
                gasMass: extendedUnit.gas_mass,
                typeOfInsulator: extendedUnit.insulator_type
            },
            motorDrive: {
                model: extendedUnit.motor_drive_model,
                operatingVoltage: extendedUnit.motor_drive_operating_voltage,
                motorVoltage: extendedUnit.motor_drive_motor_voltage
            }
        }

    return mappedUnit
}

const dispatchLoadUnits = extendedUnits => ({
    type: LOAD_EXTENDED_UNITS,
    extendedUnits
})

const dispatchLoadUnitReports = (unitId, unitReports) => ({
    type: LOAD_UNIT_REPORTS,
    unitId,
    unitReports
})

const dispatchError = error => ({
    type: ERROR,
    error
})