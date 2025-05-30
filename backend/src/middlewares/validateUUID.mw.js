function validateUUID(request, response, next) {
    const { id } = request.params;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                              // 324d7882-57b1-4844-8520-82f8ff4dba6c

    if (!uuidRegex.test(id)) {
        return response.status(400).json({ message: 'Invalid UUID format.' });
    }

    next();
}

module.exports = { validateUUID };
