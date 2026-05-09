class MetaDataBuilder {
    constructor(data = {}, options = {}) {
      // Store incoming data or default to an empty object
      this.data = data;
      this.options = {
        openGraph: options.openGraph || false,
        twitter: options.twitter || false
      };
    }
  
    /**
     * Builds the meta data object.
     * Mandatory fields: title and description (with defaults if not provided).
     * Other common meta tags are added as available.
     *
     * @returns {object} Meta data configuration
     */
    build() {
      // Mandatory meta values with defaults
      const title = this.data.title ?? "Default Title";
      const description = this.data.description ?? "Default Description";
  
      // Construct the meta object with various meta tag configurations
      const meta = {
        title,
        description,
        // Basic meta tags
        keywords: this.data?.keywords || "",
        author: this.data?.author || "",
        canonical: this.data?.canonical || "",
        viewport: this.data?.viewport || "width=device-width, initial-scale=1",
        robots: this.data?.robots || "index,nofollow",
        // Open Graph meta tags
        ...(
          this.data?.openGraph && this.options?.openGraph == true ? {
            openGraph: {
              title: this.data?.openGraph?.title || title,
              description: this.data?.openGraph?.description || description,
              url: this.data?.openGraph?.url || 'https://example.com/blog/my-blog-post',
              siteName: this.data?.openGraph?.siteName || 'Example Blog',
              ...(!this.data?.openGraph?.images ? {} : {
                  images: this.data.openGraph.images.map(image => ({
                      url: image.url,
                      width: image.width,
                      height: image.height,
                      alt: image.alt
                  }))
              }),
              locale: this.data?.openGraph?.locale || 'en_US',
              type: this.data?.openGraph?.type || 'website',
          }
          } : {}
        ),
        // Twitter meta tags
        ...(
          !this.data?.twitter && this.options?.twitter == false ? {} : {
            twitter: {
              card: this.data?.twitter?.card || "summary_large_image",
              title: this.data?.twitter?.title || title,
              description: this.data?.twitter?.description || description,
              image: this.data?.twitter?.image || "",
            }
          }
        ),
        // Additional common meta tags
        language: this.data?.language || "en",
        referrer: this.data?.referrer || "no-referrer-when-downgrade",
        "format-detection": this.data["format-detection"] || "telephone=no",
  
        // Spread any additional meta information provided
        ...this.data?.additionalMeta,
      };
  
      return meta;
    }
  }

export default MetaDataBuilder