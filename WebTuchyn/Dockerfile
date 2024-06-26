# Learn about building .NET container images:
# https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY ["WebTuchyn/WebTuchyn.csproj", "WebTuchyn/"]
RUN dotnet restore "WebTuchyn/WebTuchyn.csproj"

# copy everything else and build app
COPY . .
WORKDIR /source/WebTuchyn
RUN dotnet publish -o /app


# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "WebTuchyn.dll"]
