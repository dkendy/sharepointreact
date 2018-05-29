import differenceInMinutes from 'date-fns/difference_in_minutes'

export default Storage = (function () {

    var Type = {
        LocalStorage: "localStorage",
        SessionStorage: "sessionStorage"
    }

    function CreateObject(name) {
        name = String(name);

        return {

            "Created": (new Date()),
            "Name": name,
            "Dado": {},
        };
    }

    function checkStorageType(type) {
        var funcao = "undefined";

        if (type !== Type.LocalStorage && type !== Type.SessionStorage) {
            try {
                funcao = arguments.callee.caller.name;
            } catch (error) { }

            throw {
                "Erro": "Não foi definido o tipo de storage",
                "Module": "BHS.Storage",
                "function": funcao
            }
        }
        return true;
    }

    function add(name, data, type) {
        try
        {
            var storage = undefined;

            checkStorageType(type);

            storage = window[type];

            var newObject = CreateObject();
            newObject.Name = name;
            newObject.Dado = data;
            storage.setItem(newObject.Name, JSON.stringify(newObject));

        return newObject;
        }
        catch(e)
        {
            debugger;
            console.log(e);
        }
    }

    function get(name, type) {
   
        var storage = undefined;
        checkStorageType(type);
        storage = window[type];
        var item = storage.getItem(name);

        if (item !== null) {
            if (1 == 1) {
                try {
 
                    var elementoTransformado = JSON.parse(item); 
                    var result = differenceInMinutes(
                        new Date(),
                        new Date(elementoTransformado.Created) 
                      )

                    //10 minutos de cache
                    if (result > 10) {
                        storage.removeItem(name);
                        console.log('Cache renovado');
                        return null;
                    }

                } catch (e) {

                }
            }
            return JSON.parse(item);
        }

        return null;
    }

    function getNoExpires(name, type) {
        var storage = undefined;
        checkStorageType(type);
        storage = window[type];
        var item = storage.getItem(name);

        if (item !== null) {
            //if (type === Type.LocalStorage) 
            {
                return JSON.parse(item);
            }
        }

        return null;
    }



    return {
        Session: (function () {
            return {

                Add: function Add(name, data) {
                    var resultado = add(name, data, Type.SessionStorage);
                },

                Get: function Get(name) {
                    return get(name, Type.SessionStorage);
                },
                GetNoExpires: function Get(name) {
                    return getNoExpires(name, Type.SessionStorage);
                },
                GetIfValid: function GetIfValid(name) {
                    var dataCache = get(name, Type.SessionStorage);
                    if (dataCache !== null) {
                        if (dataCache.Dado != null) {
                            var data = (new Date(dataCache.Created));
                            var agora = (new Date());

                            if (!((agora.getHours() - data.getHours()) > 0 || ((agora.getMinutes() - data.getMinutes()) > 2))) {
                                return dataCache.Dado;
                            }
                        }
                    }
                    return null;
                },
                Remove: function Remove(name) {
                    sessionStorage.removeItem(name);
                }
            }

        })(),
        Local: (function () {
            return {

                Add: function Add(name, data) {
                    add(name, data, Type.LocalStorage);
                },

                Get: function Get(name) {
                    return get(name, Type.LocalStorage);
                }
            }
        })(),
    }
})();
