## Motivation
You might want more control over the dataflow for various reasons:

* own proxy
* analyzing and metrics
* security
* request/response modification.

For that purpose we build this library to support you when you roll your own proxy or want to route
the traffic through your current Java based solution.

We have split this function into two libraries:

### java-proxy-utils
Check it out on [GitHub](https://github.com/FACT-Finder-Web-Components/java-proxy-utils)

With this library you can easily hook into a Servlet based java proxy and prepare a request for the
FactFinder instance.
The FactFinder Web Components work with a special CORS handler for security and authentication. Therefore you
need to route the HTTP OPTIONS request from the shop to FactFinder.
The proxy-utils allows you with just a few lines of code to handle that usecase.
```java
private ProxyUtils          utils;
private FACTFinderSettings  settings;

@Override
public void init() throws ServletException {
    settings = new FACTFinderSettings();
    settings.setAccount("admin");
    settings.setPassword("myPassowrd");
    // URL to your FactFinder instance for example:
    settings.setUrl("http://my-factfinder-isntacne.de/FACT-Finder-7.2");
    utils = new ProxyUtils(settings);
    super.init();
}

public void doOptions(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    utils.redirectOPTIONS(req, resp);
}

protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    utils.redirectGET(req, resp);
};
```

Initialize the <code>FACTFinderSettings</code> with your FactFinder account and password and the
URL of your FactFinder setup. All the necessary authentication information will be injected into the
request.

If you know what you are doing, you can also build a request from scratch.
```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // set headers
    Map<String, String> header = new HashMap<String, String>();
    header.put("sid", "[session id]");
    header.put("custom_header", "[...]");

    // build request
    StringBuilder sb = new StringBuilder();
    sb.append("http://web-components.fact-finder.de/FACT-Finder-7.2");
    sb.append("/Search.ff?");
    sb.append("query=searchterm");
    sb.append("&sid=b3q08zh320");
    sb.append("&channel=my-channel");

    // send
    FACTFinderResponse response = utils.request(sb.toString(), header);
    Map<String, String> responseHeaders = response.getHeaders();
    String data = response.getData();

    utils.writeResponse(resp, data);
};
```

We added a few Helper methods for convenient use cases, for example the extraction of the original request headers:
```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // extract headers
    Map<String, String> header = ProxyUtils.extractHeaders(req);
};
```

Or a detection of the requested Service from the original request. (You maybe need the Service for parsing into the right Object Model)
```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // detect service
     FACTFinderService extractService = ProxyUtils.extractService(req);
};
```

You can also work with the data response and modify it. Therefore you can use the [Java FactFinder Domain Model](https://github.com/FACT-Finder-Web-Components/java-factfinder-domain-model)
```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ProxyUtils.copyHeaders(req, resp);
    String json = utils.sendRequest(req).getData();
    // do something with response
    utils.writeResponse(resp, json);
};
```

### Java FactFinder Domain Model
Check it out on [GitHub](https://github.com/FACT-Finder-Web-Components/java-factfinder-domain-model)

This little library allows you to parse a response from FactFinder and provides you with a Object
Model you can work with. For example filter some results or add records.
```java
String json = "...";
FactFinderParser parser = new FactFinderGsonParser();
SearchResponse searchResult = (SearchResponse) parser.parse(json, FactFinderGsonParser.SERVICE_SEARCH);
//work with searchResult...
String jsonAgain =	parser.asJson(parse);
```

When you are done, you just need to parse the Object Model back to a JSON format and send it with
the original response.

We use [Gson](https://github.com/google/gson) for the parsing with minimal pre settings.
When you need to, you can initialize the Gson parser with your custom settings.
```java
GsonBuilder builder = new GsonBuilder()
builder.serializeNulls();
//builder.setSomeOtherSettings...
Gson gson = builder.create()
FactFinderParser parser = FactFinderGsonParser(gson);
```

You dont need to use the parser we provide. If you want you can use any other JSON parsing library.
All [JSON Schema files](https://github.com/FACT-Finder-Web-Components/java-factfinder-domain-model/tree/master/src/main/resources/schema) are located within the project.
