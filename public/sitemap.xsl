<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xhtml="http://www.w3.org/1999/xhtml"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | HRDNSH.com</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #e5e7eb;
            background-color: #030712;
            margin: 0;
            padding: 2.5rem 1rem;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          h1 {
            color: #ffffff;
            font-size: 1.875rem;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          .badge {
            background: rgba(249, 115, 22, 0.15);
            color: #fb923c;
            border: 1px solid rgba(249, 115, 22, 0.3);
            font-size: 0.75rem;
            padding: 0.25rem 0.65rem;
            border-radius: 9999px;
            font-family: monospace;
            font-weight: 600;
          }
          p.desc {
            color: #9ca3af;
            font-size: 0.95rem;
            margin-bottom: 1.5rem;
            line-height: 1.5;
          }
          p.desc a {
            color: #38bdf8;
            text-decoration: none;
          }
          .stats {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 0.5rem;
            padding: 1rem 1.25rem;
            margin-bottom: 1.5rem;
            font-size: 0.875rem;
            color: #d1d5db;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: rgba(17, 24, 39, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 0.5rem;
            overflow: hidden;
            font-size: 0.875rem;
          }
          th {
            background: rgba(31, 41, 55, 0.8);
            color: #9ca3af;
            text-align: left;
            padding: 0.85rem 1rem;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 0.75rem;
            letter-spacing: 0.05em;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            color: #e5e7eb;
            vertical-align: middle;
          }
          tr:hover td {
            background: rgba(255, 255, 255, 0.02);
          }
          a.loc-link {
            color: #38bdf8;
            text-decoration: none;
            word-break: break-all;
          }
          a.loc-link:hover {
            text-decoration: underline;
          }
          .alt-tag {
            display: inline-block;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #cbd5e1;
            padding: 0.15rem 0.45rem;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            margin-right: 0.3rem;
            margin-bottom: 0.2rem;
            text-decoration: none;
            font-family: monospace;
          }
          .alt-tag:hover {
            background: rgba(56, 189, 248, 0.15);
            border-color: #38bdf8;
            color: #38bdf8;
          }
          .muted {
            color: #6b7280;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>
            <span>XML Sitemap</span>
            <span class="badge">Google-Compliant</span>
          </h1>
          <p class="desc">
            This is the production XML sitemap for <a href="https://hrdnsh.com/">hrdnsh.com</a>, formatted for search engine discovery and Google Search Console indexing.
          </p>
          <div class="stats">
            Total Indexed URLs: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
          </div>
          <table>
            <thead>
              <tr>
                <th style="width: 45%;">URL</th>
                <th style="width: 25%;">Multilingual Alternates</th>
                <th style="width: 15%;">Last Modified</th>
                <th style="width: 15%;">Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a class="loc-link">
                      <xsl:attribute name="href">
                        <xsl:value-of select="sitemap:loc"/>
                      </xsl:attribute>
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <xsl:choose>
                      <xsl:when test="xhtml:link">
                        <xsl:for-each select="xhtml:link">
                          <a class="alt-tag">
                            <xsl:attribute name="href">
                              <xsl:value-of select="@href"/>
                            </xsl:attribute>
                            <xsl:attribute name="title">
                              <xsl:value-of select="@href"/>
                            </xsl:attribute>
                            <xsl:value-of select="@hreflang"/>
                          </a>
                        </xsl:for-each>
                      </xsl:when>
                      <xsl:otherwise>
                        <span class="muted">English Universal</span>
                      </xsl:otherwise>
                    </xsl:choose>
                  </td>
                  <td>
                    <span class="muted"><xsl:value-of select="sitemap:lastmod"/></span>
                  </td>
                  <td>
                    <span class="muted"><xsl:value-of select="sitemap:priority"/></span>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
