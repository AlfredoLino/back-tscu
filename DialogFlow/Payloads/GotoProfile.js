module.exports = (id, profileUrl, photoUrl, nombre) => (
    {
        "richContent": [
        [
            {
                "type": "description",
                "title": "Creo que encontré lo que bucabas.",
                "text": [
                `Este es el perfil con ID: ${id}`,
                `Nombre: ${nombre}`
                ]
            },
            {
                "type": "image",
                "rawUrl": photoUrl,
                "accessibilityText": "foto de perfil del usuario"
            },
            {
            "type": "button",
            "icon": {
                "type": "account_circle",
                "color": "#02475e"
            },
            "text": "Ir al perfil",
            "link": profileUrl,
            }
        ]
        ]
    }
)