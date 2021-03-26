// Your code here
function createEmployeeRecord(data){
    let name = {}

    name.firstName = data[0]
    name.familyName = data[1]
    name.title = data[2]
    name.payPerHour = data[3]
    name.timeInEvents = []
    name.timeOutEvents = []
    
    return name
}

function createEmployeeRecords(arr){
        return arr.map(record => createEmployeeRecord(record))
    };

function createTimeInEvent(employee, date) {
        const event = {}
        event.type = "TimeIn"
        event.date = date.split(" ")[0]
        event.hour = parseInt(date.split(" ")[1])
        employee.timeInEvents.push(event)
        return employee
    }

    function createTimeOutEvent(employee, date) {
        const event = {}
        event.type = "TimeOut"
        event.date = date.split(" ")[0]
        event.hour = parseInt(date.split(" ")[1])
        employee.timeOutEvents.push(event)
        return employee
    };

    function hoursWorkedOnDate(employee, date){
        const timeIn = employee.timeInEvents.find(e => e.date == date)
        const timeOut = employee.timeOutEvents.find(e => e.date == date)
    
        return (timeOut.hour - timeIn.hour)/100
    };

    function wagesEarnedOnDate(employee, date){
        return hoursWorkedOnDate(employee, date) * employee.payPerHour
    };
    
    function allWagesFor(employee){
       const dates = employee.timeInEvents.map(e => e.date)
       return dates.reduce(function(total, date){
           return wagesEarnedOnDate(employee, date) + total
       },0)
    };

    function findEmployeeByFirstName(srcArray, firstName){
       return srcArray.find(employee => employee.firstName === firstName)
    };
    
    function calculatePayroll(employees){
        return employees.reduce(function(total, employee){
            return total + allWagesFor(employee)
        },0)
    };