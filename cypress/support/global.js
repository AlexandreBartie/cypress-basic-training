//
// -- Global Commands --
//

module.exports = function () {

    return {

        HasArg : function (arg) {

            return (typeof arg !== 'undefined')
        
        },
        
        IsString : function (arg) {
        
            return (typeof arg === 'string')
        
        },
        
        IsFull : function (text) {
        
            return (text != "")
        
        }

    }

  }


