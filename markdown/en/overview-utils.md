## Motivation
You might want a little bit more controll of the dataflow for different reasons:

* own proxy
* analyzing and metrics
* security
* request/response modification.

For that purpose we build this library to support you when you roll your own proxy or want to route
the traffic through your current Java based soulution.

We have split this functions into 2 librarys:

### java-proxy-utils
Check it out on [GitHub](https://github.com/FACT-Finder-Web-Components/java-proxy-utils)

With this library you can easily hook into a Servlet based java proxy and prepare a request for the
FACT-Finder instance.
The Web Components work with a special CORS handler for security and authentication. Therefore you
need to route the HTTP OPTIONS request from the shop to FACT-Finder.
The proxy-utils allows you with just a few lines of code to handle that usecase.
```java
private ProxyUtils          utils;
private FACTFinderSettings  settings;

@Override
public void init() throws ServletException {
    settings = new FACTFinderSettings();
    settings.setAccount("admin");
    settings.setPassword("myPassowrd");
    // url to your FACTFinder instance for example:
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

Initialize the <code>FACTFinderSettings</code> with your FACT-Finder account and password and the
url of your FACT-Finder setup. All the necessary authentication information will be injected into the
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

You can also work with the data response and modify it. Therefore you can use the [Java FACT-Finder Domain Model](https://github.com/FACT-Finder-Web-Components/java-factfinder-domain-model)
```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ProxyUtils.copyHeaders(req, resp);
    String json = utils.sendRequest(req).getData();
    // do something with response
    utils.writeResponse(resp, json);
};
```

### Java FACT-Finder Domain Model
Check it out on [GitHub](https://github.com/FACT-Finder-Web-Components/java-factfinder-domain-model)

This little library allows you to parse a response from FACT-Finder and provides you with a Object
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
