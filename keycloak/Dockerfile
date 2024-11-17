FROM quay.io/keycloak/keycloak:latest

ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin
ENV KC_DB=dev-file
ENV PROXY_ADDRESS_FORWARDING=true

# Copy the realm configuration file
COPY autopilot-dashboard-realm.json /opt/keycloak/data/import/

# Run Keycloak in development mode with auto-import
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--import-realm"]
